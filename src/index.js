/**
 * Clawport Control Center - Main Application
 * 
 * A modern project management platform with AI agent integration.
 * Built with Node.js, Express, and PostgreSQL.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const { Pool } = require('pg');
const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');

// Configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://clawport:clawport123@localhost:5432/clawport';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

// Initialize Express
const app = express();
const server = http.createServer(app);

// Initialize Database
const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Initialize Redis
const redis = new Redis(REDIS_URL);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// ============================================
// Health Check
// ============================================
app.get('/health', async (req, res) => {
  try {
    // Check database
    await pool.query('SELECT 1');
    
    // Check Redis
    await redis.ping();
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: NODE_ENV,
      services: {
        database: 'connected',
        redis: 'connected',
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      error: error.message,
      services: {
        database: 'disconnected',
        redis: 'disconnected',
      },
    });
  }
});

// ============================================
// API Routes
// ============================================

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create project
app.post('/api/projects', async (req, res) => {
  try {
    const { name, description, ownerId } = req.body;
    const result = await pool.query(
      `INSERT INTO projects (name, description, owner_id) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [name, description, ownerId]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { projectId, status } = req.query;
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];
    
    if (projectId) {
      params.push(projectId);
      query += ` AND project_id = $${params.length}`;
    }
    
    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  try {
    const { projectId, title, description, priority, assigneeId, dueDate } = req.body;
    const result = await pool.query(
      `INSERT INTO tasks (project_id, title, description, priority, assignee_id, due_date) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [projectId, title, description, priority, assigneeId, dueDate]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update task status
app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const completedAt = status === 'done' ? new Date().toISOString() : null;
    
    const result = await pool.query(
      `UPDATE tasks SET status = $1, completed_at = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 
       RETURNING *`,
      [status, completedAt, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all agents
app.get('/api/agents', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM agents ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Execute agent
app.post('/api/agents/:id/execute', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, context } = req.body;
    
    // Verify agent exists
    const agentCheck = await pool.query('SELECT * FROM agents WHERE id = $1', [id]);
    if (agentCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Agent not found' });
    }
    
    // Create execution record
    const executionId = uuidv4();
    await pool.query(
      `INSERT INTO agent_executions (id, agent_id, status, input, started_at) 
       VALUES ($1, $2, 'running', $3, NOW())`,
      [executionId, id, task]
    );
    
    // TODO: Integrate with actual AI agent (OpenRouter/Gensee)
    // For now, simulate execution
    setTimeout(async () => {
      const output = `Agent executed task: ${task}`;
      await pool.query(
        `UPDATE agent_executions 
         SET status = 'completed', output = $1, completed_at = NOW() 
         WHERE id = $2`,
        [output, executionId]
      );
    }, 2000);
    
    res.json({
      success: true,
      data: {
        executionId,
        status: 'running',
        message: 'Agent execution started',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// Metrics
// ============================================
app.get('/api/metrics', async (req, res) => {
  try {
    const [projects, tasks, agents, executions] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM projects'),
      pool.query('SELECT COUNT(*) FROM tasks'),
      pool.query('SELECT COUNT(*) FROM agents'),
      pool.query('SELECT COUNT(*) FROM agent_executions'),
    ]);
    
    res.json({
      success: true,
      data: {
        projects: parseInt(projects.rows[0].count),
        tasks: parseInt(tasks.rows[0].count),
        agents: parseInt(agents.rows[0].count),
        executions: parseInt(executions.rows[0].count),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// Error Handling
// ============================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

// ============================================
// Start Server
// ============================================
async function start() {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('✓ Database connected');
    
    // Test Redis connection
    await redis.ping();
    console.log('✓ Redis connected');
    
    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Clawport Control Center running on port ${PORT}`);
      console.log(`   Environment: ${NODE_ENV}`);
      console.log(`   Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await pool.end();
  await redis.quit();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

start();

module.exports = { app, server, pool, redis };
