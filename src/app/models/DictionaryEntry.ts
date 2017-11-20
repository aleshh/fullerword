export interface DictionaryEntry {
  metadata: { provider: string },
  results: [
    { lexicalEntries: [
      { entries: [
        { senses: [
          { definitions: string[]}
        ] }
      ]}
    ]}
  ]
}