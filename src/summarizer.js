import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";

// In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
const text = fs.readFileSync("too_busy.txt", "utf8");
const model = new OpenAI({ temperature: 0 });
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

// This convenience function creates a document chain prompted to summarize a set of documents.
const chain = loadSummarizationChain(model, { type: "map_reduce" });
const res = await chain.call({
  input_documents: docs,
});
console.log({ res });
/*
{
  res: {
    text: 'Many people are too busy to enjoy life, using work as a numbing strategy to avoid facing the truth of their lives. 
    Research shows that humans tend to do whatever it takes to keep busy, even if the activity feels meaningless. 
    Instead of measuring progress by the quantity of work produced, we should consider the quality of our work and its impact 
    on our mental and physical well-being. Taking the time to consider whether we are actually too busy to enjoy life is important,
    as it is a gift to our future selves.'
  }
}
*/