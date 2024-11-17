import OpenAI from 'openai';
import { WalletData } from '~~/types/wallet';

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are an expert blockchain credit analyst specializing in on-chain reputation scoring. Your task is to analyze wallet activity and calculate a credit score from 300-850 using these specific criteria:

1. Transaction History (40% - Max 340 points):
- Transaction Frequency: 
  * Regular activity (daily/weekly) = 100 points
  * Moderate activity (monthly) = 60 points
  * Irregular activity = 30 points
- Transaction Success Rate:
  * >98% success = 80 points
  * 95-98% = 60 points
  * <95% = 30 points
- Gas Efficiency:
  * Optimal gas usage = 80 points
  * Average gas usage = 50 points
  * High gas usage = 20 points
- Transaction Value Consistency:
  * Stable average value = 80 points
  * Moderate fluctuation = 50 points
  * High volatility = 20 points

2. Asset Management (30% - Max 255 points):
- Portfolio Diversity:
  * >5 different tokens = 85 points
  * 3-5 tokens = 60 points
  * <3 tokens = 30 points
- Balance Stability:
  * Maintained/growing balance = 85 points
  * Slight decline = 60 points
  * Sharp decline = 30 points
- Cross-chain Activity:
  * Active on multiple chains = 85 points
  * Single chain activity = 40 points

3. DeFi Engagement (20% - Max 170 points):
- Protocol Interactions:
  * Multiple protocols = 70 points
  * Single protocol = 40 points
  * No DeFi activity = 0 points
- Position Management:
  * Long-term positions = 50 points
  * Mixed timeframes = 30 points
  * Short-term only = 15 points
- Risk Profile:
  * Conservative = 50 points
  * Moderate = 30 points
  * Aggressive = 15 points

4. Network Effect (10% - Max 85 points):
- Unique Contacts:
  * >50 unique addresses = 35 points
  * 20-50 addresses = 25 points
  * <20 addresses = 10 points
- Contract Interactions:
  * Regular smart contract usage = 25 points
  * Occasional usage = 15 points
  * Minimal usage = 5 points
- Community Participation:
  * Active in multiple networks = 25 points
  * Single network focus = 15 points
  * Limited participation = 5 points

Base Score: 300 points
Maximum Additional Points: 550
Total Possible Score: 850

For each category:
1. Calculate exact points based on the data
2. Provide specific reasons for point allocation
3. Identify key strengths and weaknesses
4. Give actionable recommendations for improvement

Consider both Sepolia and Base Sepolia metrics when calculating the final score, giving more weight to consistent behavior across chains.`;

export interface CreditScoreAnalysis {
  score: number;
  breakdown: {
    transactionHistory: number;
    assetManagement: number;
    defiBehavior: number;
    networkEffect: number;
  };
  factors: {
    positive: string[];
    negative: string[];
  };
  recommendations: string[];
}

export async function analyzeCreditScore(data: WalletData): Promise<CreditScoreAnalysis> {
  const userPrompt = `
    Analyze this wallet's on-chain data and calculate a precise credit score using the defined scoring criteria.
    
    Sepolia Metrics:
    - Balance: ${data.sepolia.metrics.balance} ETH
    - Total Transactions: ${data.sepolia.metrics.transactionCount}
    - Unique Contacts: ${data.sepolia.metrics.uniqueContacts}
    - Unique Tokens: ${data.sepolia.metrics.uniqueTokenCount}
    - Account Age: ${data.sepolia.metrics.accountAge}
    - Total Value Transferred: ${data.sepolia.metrics.totalValue} ETH
    - Average Transaction Value: ${data.sepolia.metrics.avgTransactionValue} ETH
    - Total Gas Used: ${data.sepolia.metrics.gasUsed}

    Base Sepolia Metrics:
    - Balance: ${data.baseSepolia.metrics.balance} ETH
    - Total Transactions: ${data.baseSepolia.metrics.transactionCount}
    - Unique Contacts: ${data.baseSepolia.metrics.uniqueContacts}
    - Unique Tokens: ${data.baseSepolia.metrics.uniqueTokenCount}
    - Account Age: ${data.baseSepolia.metrics.accountAge}
    - Total Value Transferred: ${data.baseSepolia.metrics.totalValue} ETH
    - Average Transaction Value: ${data.baseSepolia.metrics.avgTransactionValue} ETH
    - Total Gas Used: ${data.baseSepolia.metrics.gasUsed}

    Additional Context:
    - Transaction frequency: Calculate based on account age and transaction count
    - Cross-chain activity: Compare metrics between chains
    - Gas efficiency: Compare gas used against transaction count and value
    - Balance stability: Compare current balance with total value transferred
    - DeFi engagement: Analyze unique token count and contract interactions

    Provide the analysis in this JSON format:
    {
      "score": number,
      "breakdown": {
        "transactionHistory": number (based on 40% weight),
        "assetManagement": number (based on 30% weight),
        "defiBehavior": number (based on 20% weight),
        "networkEffect": number (based on 10% weight)
      },
      "factors": {
        "positive": [
          "Specific strength with numerical evidence",
          "Another strength with data points"
        ],
        "negative": [
          "Specific weakness with numerical evidence",
          "Another weakness with data points"
        ]
      },
      "recommendations": [
        "Specific, actionable recommendation with expected impact",
        "Another detailed recommendation"
      ]
    }

    Ensure all scores and breakdowns exactly match the scoring criteria defined in the system prompt.
    Provide specific, data-backed reasons for each score component.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5 
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response as string) as CreditScoreAnalysis;
  } catch (error) {
    console.error('Error analyzing credit score:', error);
    throw new Error('Failed to analyze credit score');
  }
}