"use client"

import { FileText, Download, ExternalLink as ExternalLinkIcon } from "lucide-react"

interface TextContentProps {
  content: string
  format?: 'markdown' | 'html' | 'plain'
}

export default function TextContent({ content, format = 'markdown' }: TextContentProps) {
  return (
    <div className="glass-card">
      <div className="prose prose-invert max-w-none">
        <div className="text-metrix-muted leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  )
}

interface DownloadLinkProps {
  url: string
  title: string
  description?: string
  fileSize?: string
  fileType?: string
}

export function DownloadLink({ url, title, description, fileSize, fileType }: DownloadLinkProps) {
  return (
    <a
      href={url}
      download
      className="glass-card hover:bg-white/10 transition flex items-center gap-4 p-4"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-metrix-purple/20 to-metrix-pink/20 flex items-center justify-center flex-shrink-0">
        <Download className="w-6 h-6 text-metrix-purple" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium mb-1">{title}</h4>
        {description && <p className="text-metrix-muted text-sm">{description}</p>}
        {(fileSize || fileType) && (
          <p className="text-metrix-muted text-xs mt-1">
            {[fileSize, fileType].filter(Boolean).join(' • ')}
          </p>
        )}
      </div>
    </a>
  )
}

interface ExternalLinkProps {
  url: string
  title: string
  description?: string
  domain?: string
}

export function ExternalLink({ url, title, description, domain }: ExternalLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card hover:bg-white/10 transition flex items-center gap-4 p-4"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-metrix-green/20 to-metrix-green-bright/20 flex items-center justify-center flex-shrink-0">
        <ExternalLinkIcon className="w-6 h-6 text-metrix-green-bright" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium mb-1">{title}</h4>
        {description && <p className="text-metrix-muted text-sm">{description}</p>}
        {domain && <p className="text-metrix-muted text-xs mt-1">{domain}</p>}
      </div>
    </a>
  )
}
