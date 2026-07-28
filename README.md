# Review WorkFlow

1. PR Webhook Trigger
        ↓
2. Save PR (Status = PROCESSING)
        ↓
3. Fetch changed files from GitHub
        ↓
4. Filter reviewable files (.ts, .tsx, .js, etc.)
        ↓
5. Check: Is repository synced?
        ↓
      ┌───────────────┴───────────────┐
      │                               │
   YES (Synced)                 NO (Not Synced)
      │                               │
6. Retrieve relevant           6. Chunk changed files
   context from Pinecone          (300–500 lines)
      │                               │
7. Chunk changed files         7. Send chunks directly
      │                           to AI
8. Send:
   - Current chunk
   - Retrieved context
   to AI
      │
      └───────────────┬───────────────┘
                      ↓
9. Generate review for each chunk
                      ↓
10. Merge all chunk reviews into one final review
                      ↓
11. Post GitHub PR comment
                      ↓
12. Mark PR = REVIEWED