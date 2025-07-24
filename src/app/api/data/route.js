import connectMongo from "../../../lib/db";
import { NextResponse } from "next/server";
import blog from "../../../models/blog";

const blogsData =[
  {
    title: {
      en: "The Future of Mobile App Development",
      hi: "मोबाइल ऐप विकास का भविष्य"
    },
    slug: "future-of-mobile-app-development",
    content: {
      en: "Mobile app development is rapidly evolving with AI, cross-platform tools, and 5G integration...",
      hi: "मोबाइल ऐप विकास तेजी से बदल रहा है, जिसमें एआई, क्रॉस-प्लेटफॉर्म टूल्स और 5G शामिल हैं..."
    },
    category: {
      en: "Technology",
      hi: "प्रौद्योगिकी"
    },
    tags: ["mobile", "AI", "5G"],
    author: "admin",
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    published: true
  },
  {
    title: {
      en: "Understanding Digital Transformation",
      hi: "डिजिटल परिवर्तन को समझना"
    },
    slug: "understanding-digital-transformation",
    content: {
      en: "Digital transformation involves integrating digital technologies into all areas of a business...",
      hi: "डिजिटल परिवर्तन में एक व्यवसाय के सभी क्षेत्रों में डिजिटल तकनीकों का एकीकरण शामिल होता है..."
    },
    category: {
      en: "Business",
      hi: "व्यवसाय"
    },
    tags: ["digital", "business", "strategy"],
    author: "admin",
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    published: true
  },
  {
    title: {
      en: "Why React is Leading Frontend Development",
      hi: "React फ्रंटेंड विकास में अग्रणी क्यों है"
    },
    slug: "react-leading-frontend",
    content: {
      en: "React’s virtual DOM and component-based architecture makes UI development efficient...",
      hi: "React का वर्चुअल DOM और घटक-आधारित आर्किटेक्चर UI विकास को कुशल बनाता है..."
    },
    category: {
      en: "Web Development",
      hi: "वेब विकास"
    },
    tags: ["react", "frontend", "javascript"],
    author: "admin",
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    published: true
  },
  {
    title: {
      en: "Cloud Computing: Benefits for Startups",
      hi: "क्लाउड कंप्यूटिंग: स्टार्टअप्स के लिए लाभ"
    },
    slug: "cloud-computing-benefits-startups",
    content: {
      en: "Cloud computing offers flexibility, scalability, and cost-efficiency for growing businesses...",
      hi: "क्लाउड कंप्यूटिंग बढ़ते व्यवसायों के लिए लचीलापन, स्केलेबिलिटी और लागत-कुशलता प्रदान करता है..."
    },
    category: {
      en: "Cloud",
      hi: "क्लाउड"
    },
    tags: ["cloud", "startups", "devops"],
    author: "admin",
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    published: true
  },
  {
    title: {
      en: "Introduction to Full Stack Development",
      hi: "फुल स्टैक विकास का परिचय"
    },
    slug: "intro-full-stack-development",
    content: {
      en: "Full stack development covers both frontend and backend, making you a versatile developer...",
      hi: "फुल स्टैक विकास फ्रंटएंड और बैकएंड दोनों को कवर करता है, जिससे आप एक बहुमुखी डेवलपर बनते हैं..."
    },
    category: {
      en: "Programming",
      hi: "प्रोग्रामिंग"
    },
    tags: ["fullstack", "mern", "developer"],
    author: "admin",
    image: "https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753202860/1500-x-914-Making-the-most-out-of-Digital-Transformation-in-Mobile-and-Web-App-Development_qqahv9.webp",
    published: true
  }
]



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

