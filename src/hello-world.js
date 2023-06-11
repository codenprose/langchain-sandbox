import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

console.log("Loading model...");

const model = new OpenAI({ model: "text-davinci-003", temperature: 0.9 });
const template = "Question: {question}"
const prompt = new PromptTemplate({
  template,
  inputVariables: ["question"],
})
const question = "What is a good name for an online course that helps creators build products?"
const llmChain = new LLMChain({
  prompt,
  llm: model,
})
// const res = await llmChain.run(question);
// console.log(res); // Answer: "Product Creation Mastery"

const res = await llmChain.call({ question })
console.log(res) // { text: '\n\nAnswer: Creative Product Builder Bootcamp' }