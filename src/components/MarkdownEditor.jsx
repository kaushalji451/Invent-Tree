"use client";

import React, { useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";


export default function MarkdownEditor({ value, onChange }) {
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <div className="mt-4">
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
      />
    </div>
  );
}
