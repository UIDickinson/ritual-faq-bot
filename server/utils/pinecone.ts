import { Pinecone } from '@pinecone-database/pinecone';

let pineconeClient: any = null;

export function getPineconeClient() {
  if (!pineconeClient) {
    const apiKey = process.env.PINECONE_API_KEY;
    const indexName = process.env.PINECONE_INDEX_NAME;
    
    if (!apiKey) {
      throw new Error("PINECONE_API_KEY environment variable is not set");
    }
    
    if (!indexName) {
      throw new Error("PINECONE_INDEX_NAME environment variable is not set");
    }
    
    const pinecone = new Pinecone({
      apiKey,
    });
    
    pineconeClient = pinecone.index(indexName);
  }
  
  return pineconeClient;
}
