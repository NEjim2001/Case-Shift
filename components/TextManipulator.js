"use client";
import React, { useEffect, useState } from "react";
import { fetchPhrases } from "../api/rephrase";

const text =
  "Throughout this page, we will explore the advantages and features of the Paraphrase API.";

export default function TextManipulator() {
  const [inputValue, setInputValue] = useState("");

  const CHARACTER_COUNT_LABEL = "Character Count:";
  const WORD_COUNT_LABEL = "Word Count:";
  const SENTENCE_COUNT_LABEL = "Sentence Count:";

  const conversionTypes = [
    "upper",
    "lower",
    "title",
    "sentence",
    "toggle",
    "camel",
    "pascal",
    "snake",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function toSentenceCase(str) {
    // TODO ADD Period Detection
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }

  function toToggleCase(str) {
    let data = "";
    for (let letter of str) {
      if (letter == letter.toUpperCase()) {
        data += letter.toLowerCase();
      } else {
        data += letter.toUpperCase();
      }
    }
    return data;
  }

  function toPascalCase(str) {
    return str
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
      .replace(" ", "");
  }

  function toCamelCase(str) {
    return str
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toLowerCase() + txt.substr(1).toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  function toSnakeCase(str) {
    return str.toLowerCase().replace(" ", "_");
  }

  const handleConversion = (conversion) => {
    switch (conversion) {
      case "upper":
        setInputValue(inputValue.toUpperCase());
        break;
      case "lower":
        setInputValue(inputValue.toLowerCase());
        break;
      case "title":
        setInputValue(toTitleCase(inputValue));
        break;
      case "sentence":
        setInputValue(toSentenceCase(inputValue));
        break;
      case "toggle":
        setInputValue(toToggleCase(inputValue));
        break;
      case "camel":
        setInputValue(toCamelCase(inputValue));
        break;
      case "pascal":
        setInputValue(toPascalCase(inputValue));
        break;
      case "snake":
        setInputValue(toSnakeCase(inputValue));
        break;
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(inputValue);
    alert("Text copied to clipboard!");
  };

  const clear = () => {
    setInputValue("");
  };

  const getCharacterCount = (text) => text.length;

  const getWordCount = (text) => {
    const words = text.split(/\s+/);
    return words.filter((word) => word !== "").length;
  };
  const getSentenceCount = (text) => {
    const sentences = text.split(".");
    return sentences.length - 1;
  };

  return (
    <div className='flex flex-col items-center space-y-5'>
      <textarea
        className='bg-black text-white w-11/12 sm:h-60 lg:h-96'
        placeholder='Input here'
        value={inputValue}
        onChange={handleInputChange}
      />

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-neutral-900 p-4 w-11/12 rounded-xl'>
        {conversionTypes.map((type) => {
          return (
            <button
              key={type}
              onClick={() => handleConversion(type)}
              className='button-main'
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Case
            </button>
          );
        })}

        <button onClick={copyText} className='button-main' type='copy'>
          Copy Text
        </button>
        <button className='button-special' type='rephrase'>
          Rephrase
        </button>
        <button onClick={clear} className='button-clear' type='clear'>
          Clear
        </button>
      </section>

      <section className='flex flex-rows items-center justify-center pb-10 text-white space-x-2'>
        <div>{`${CHARACTER_COUNT_LABEL} ${getCharacterCount(
          inputValue
        )} |`}</div>
        <div>{`${WORD_COUNT_LABEL} ${getWordCount(inputValue)} |`}</div>
        <div>{` ${SENTENCE_COUNT_LABEL} ${getSentenceCount(inputValue)}`}</div>
      </section>
    </div>
  );
}
