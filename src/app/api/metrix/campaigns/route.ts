import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Fetch from Meta Ads API
    const accessToken = process.env.META_ACCESS_TOKEN
    const adAccountId = process.env.META_AD_ACCOUNT_ID

    if (!accessToken || !adAccountId) {
      // Return mock data for demo
      return NextResponse.json({
        campaigns: [
          {
            id: "1",
            name: "Campaña Conversión Q1 2026",
            platform: "facebook" as const,
            spend: 1250.50,
            cpc: 0.85,
            ctr: 2.3,
            conversions: 147,
            status: "good" as const
          },
          {
            id: "2",
            name: "Brand Awareness Instagram",
            platform: "instagram" as const,
            spend: 890.00,
            cpc: 1.20,
            ctr: 1.8,
            conversions: 74,
            status: "warning" as const
          },
          {
            id: "3",
            name: "Retargeting Carrito",
            platform: "facebook" as const,
            spend: 2100.75,
            cpc: 2.50,
            ctr: 0.9,
            conversions: 84,
            status: "danger" as const
          }
        ]
      })
    }

    // Real Meta API call
    const fields = "id,name,insights.metric(spends,clicks,impressions,ctr,cpc,conversions)"
    const url = `https://graph.facebook.com/v19.0/act_${adAccountId}/campaigns?access_token=${accessToken}&fields=${fields}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error.message)
    }

    // Transform Meta data to our format
    const campaigns = data.data.map((campaign: any) => {
      const insights = campaign.insights?.data?.[0] || {}
      const spend = parseFloat(insights.spend || 0)
      const clicks = parseInt(insights.clicks || 0)
      const impressions = parseInt(insights.impressions || 0)
      const conversions = parseInt(insights.conversions || 0)
      
      const cpc = clicks > 0 ? spend / clicks : 0
      const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0

      // Determine status based on CPC and CTR thresholds
      let status: "good" | "warning" | "danger" = "good"
      if (cpc > 2.0 || ctr < 1.0) {
        status = "danger"
      } else if (cpc > 1.5 || ctr < 1.5) {
        status = "warning"
      }

      // Determine platform from campaign name
      const platform = campaign.name.toLowerCase().includes("instagram") 
        ? "instagram" as const 
        : "facebook" as const

      return {
        id: campaign.id,
        name: campaign.name,
        platform,
        spend,
        cpc,
        ctr,
        conversions,
        status
      }
    })

    return NextResponse.json({ campaigns })
  } catch (error) {
    console.error("Error fetching Meta campaigns:", error)
    return NextResponse.json(
      { error: "Failed to fetch campaigns", campaigns: [] },
      { status: 500 }
    )
  }
}
