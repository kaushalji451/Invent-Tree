import connectMongo from "../../../lib/db";
import { NextResponse } from "next/server";
import blog from "../../../models/blog";

const blogsData = [
  {
    title: "5 Digital Strategies That Won Elections in 2024",
    slug: "digital-strategies-elections-2024",
    content: `## Introduction
In 2024, several political campaigns broke new ground using digital-first strategies.
In this blog, we analyze five key approaches that defined electoral success.`,
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    category: "Strategy",
    tags: ["digital", "campaign", "elections"],
    author: "Team Insight",
    published: true,
    publishedAt: new Date("2025-05-10"),
    language: "en",
  },
  {
    title: "Booth Management Best Practices",
    slug: "booth-management-practices",
    content: `Managing polling booths efficiently can make or break a campaign.
This post outlines proven techniques for booth-level management and volunteer coordination.`,
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    category: "Operations",
    tags: ["booth", "voter-turnout", "strategy"],
    author: "Operations Team",
    published: true,
    publishedAt: new Date("2025-06-01"),
    language: "en",
  },
  {
    title: "AI in Political Campaigning: Hype or Game-Changer?",
    slug: "ai-in-political-campaigning",
    content: `Artificial Intelligence is transforming modern politics.
From sentiment analysis to chatbot-driven voter engagement — here's what's real and what's not.`,
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    category: "Technology",
    tags: ["AI", "data", "voter-insight"],
    author: "Research Desk",
    published: true,
    publishedAt: new Date("2025-06-15"),
    language: "en",
  },
  {
    title: "युवाओं को कैसे जोड़े अपने चुनाव अभियान से?",
    slug: "youth-engagement-election-hindi",
    content: `## भूमिका
भारत के युवा वोटरों को जोड़ने के लिए रणनीतिक सोशल मीडिया अभियानों और ग्राउंड आउटरीच की भूमिका अत्यंत महत्वपूर्ण होती जा रही है। इस लेख में जानें प्रभावी तकनीकें।`,
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    category: "Engagement",
    tags: ["youth", "engagement", "hindi"],
    author: "Niti Manch",
    published: true,
    publishedAt: new Date("2025-07-01"),
    language: "hi",
  },
  {
    title: "How to Build a Political Brand That Lasts",
    slug: "building-political-brand",
    content: `A strong political brand is more than just a logo or slogan.
In this guide, we cover steps to build and maintain a trustworthy, consistent image across all platforms.`,
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    category: "Branding",
    tags: ["branding", "leadership", "strategy"],
    author: "BrandLab",
    published: true,
    publishedAt: new Date("2025-07-10"),
    language: "en",
  },
];



export async function GET(req) {
try {
    await connectMongo();
    await blog.insertMany(blogsData);
    console.log("done");
     return NextResponse.json(
          { message: "Data Fetched Successfully." },
          { status: 200 }
        );
} catch (error) {
    console.log("some error ");
     return NextResponse.json({ message: "Contacts Not found." }, { status: 404 });
       
}

}

