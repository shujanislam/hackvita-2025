import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../componenets/Navbar.tsx';

type CardProps = {
  title: string;
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

const Dashboard: React.FC = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (topic.trim()) {
      navigate(`/course?topic=${encodeURIComponent(topic)}`);
    }
  };

  return (
  <>
    <Navbar />
    <div className="p-6 grid gap-6 lg:grid-cols-3">
      {/* What Do You Want to Learn? */}
      <Card title="What Do You Want to Learn?">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </Card>

      {/* Trending Courses */}
      <Card title="Trending Courses">
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>Advanced React</span>
            <Button>Learn</Button>
          </li>
          <li className="flex justify-between">
            <span>Node.js Mastery</span>
            <Button>Learn</Button>
          </li>
          <li className="flex justify-between">
            <span>Machine Learning Basics</span>
            <Button>Learn</Button>
          </li>
        </ul>
      </Card>

      {/* Take a Capability Test */}
      <Card title="Take a Capability Test">
        <p>Evaluate your skills and get personalized course recommendations.</p>
        <div className="mt-4">
          <Button>Start Test</Button>
        </div>
      </Card>
    </div>
  </>
  );
};

export default Dashboard;
