export const mockRiskyWalletResponse = [
  {
    "accountExternalId": "customer123",
    "address": "149w62rY42aZBox8fGcmqNsXUzSStKeq8C",
    "addressRiskIndicators": [
      {
        "category": "Sanctions",
        "categoryId": "69",
        "categoryRiskScoreLevel": 15,
        "categoryRiskScoreLevelLabel": "Severe",
        "incomingVolumeUsd": "387155446.31",
        "outgoingVolumeUsd": "28324.01",
        "riskType": "INDIRECT",
        "totalVolumeUsd": "387183770.32"
      },
      {
        "category": "Ransomware",
        "categoryId": "58",
        "categoryRiskScoreLevel": 10,
        "categoryRiskScoreLevelLabel": "High",
        "incomingVolumeUsd": "6342083.387155446",
        "outgoingVolumeUsd": "6360433.509636739",
        "riskType": "OWNERSHIP",
        "totalVolumeUsd": "12702516.896792185"
      },
      {
        "category": "Ransomware",
        "categoryId": "58",
        "categoryRiskScoreLevel": 10,
        "categoryRiskScoreLevelLabel": "High",
        "incomingVolumeUsd": "10358.155950527",
        "outgoingVolumeUsd": "64919.190147929",
        "riskType": "COUNTERPARTY",
        "totalVolumeUsd": "75277.346098456"
      }
    ],
    "addressSubmitted": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "chain": "bitcoin",
    "entities": [
      {
        "category": "Ransomware",
        "categoryId": "58",
        "entity": "SamSam",
        "riskScoreLevel": 15,
        "riskScoreLevelLabel": "Severe",
        "trmAppUrl": "https://app.trmlabs.com/entities/trm/439c54d9-e9ca-43d1-be98-0cb0a68fd16e",
        "trmUrn": "/entity/manual/439c54d9-e9ca-43d1-be98-0cb0a68fd16e"
      }
    ],
    "trmAppUrl": "https://app.trmlabs.com/address/149w62rY42aZBox8fGcmqNsXUzSStKeq8C/btc"
  }
];