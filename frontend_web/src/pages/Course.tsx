import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

type Roadmap = {
    Topic_Name: string;
    subtopics: string[];
};

type Content = {
    heading: string;
    lesson: string;
};

const Course = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const topic = queryParams.get("topic");
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
    const [selectedContents, setSelectedContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/roadmap/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: topic }),
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch roadmaps');
                }
                const data = await response.json();
                setRoadmaps(data.response);

                if (data.response.length > 0) {
                    setSelectedTopic(data.response[0].Topic_Name);
                    setSelectedSubtopic(data.response[0].subtopics[0]);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    useEffect(() => {
        const fetchContents = async () => {
            if (!selectedTopic || !selectedSubtopic) return;
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/roadmap/content`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: selectedTopic, subtopic: selectedSubtopic }),
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch contents');
                }
                const data = await response.json();
                setSelectedContents(data.response);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContents();
    }, [selectedSubtopic]);

    const handlePrev = () => {
        if (!selectedTopic) return;
        const topicObj = roadmaps.find((r) => r.Topic_Name === selectedTopic);
        if (!topicObj) return;
        const currentIndex = topicObj.subtopics.indexOf(selectedSubtopic!);
        if (currentIndex > 0) {
            setSelectedSubtopic(topicObj.subtopics[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        if (!selectedTopic) return;
        const topicObj = roadmaps.find((r) => r.Topic_Name === selectedTopic);
        if (!topicObj) return;
        const currentIndex = topicObj.subtopics.indexOf(selectedSubtopic!);
        if (currentIndex < topicObj.subtopics.length - 1) {
            setSelectedSubtopic(topicObj.subtopics[currentIndex + 1]);
        }
    };

    return (
        <div className='p-4'>
            {loading ? (
                <p className='text-center text-gray-600'>Loading...</p>
            ) : (
                <div className='flex'>
                    <div className='w-1/3 p-4 bg-gray-100 rounded-lg'>
                        {roadmaps.map((roadmap) => (
                            <div key={roadmap.Topic_Name} className='mb-2'>
                                <h3
                                    className={`cursor-pointer p-2 font-bold ${selectedTopic === roadmap.Topic_Name ? 'text-blue-600' : 'text-gray-800'}`}
                                    onClick={() => setSelectedTopic(roadmap.Topic_Name)}
                                >
                                    {roadmap.Topic_Name}
                                </h3>
                                {selectedTopic === roadmap.Topic_Name && (
                                    <ul className='pl-4'>
                                        {roadmap.subtopics.map((subtopic) => (
                                            <li
                                                key={subtopic}
                                                className={`cursor-pointer p-1 ${selectedSubtopic === subtopic ? 'text-blue-500 font-bold' : 'text-gray-700'}`}
                                                onClick={() => setSelectedSubtopic(subtopic)}
                                            >
                                                {subtopic}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='w-2/3 p-4 bg-white rounded-lg shadow'>
                        {selectedContents.map((content, index) => (
                            <div key={index}>
                                <h3 className='text-xl font-bold mb-2'>{content.heading}</h3>
                                <p className='text-gray-700'>{content.lesson}</p>
                            </div>
                        ))}
                        <div className='flex justify-between mt-4'>
                            <button onClick={handlePrev} className='bg-gray-300 px-4 py-2 rounded disabled:opacity-50' disabled={!selectedTopic || roadmaps.find((r) => r.Topic_Name === selectedTopic)?.subtopics[0] === selectedSubtopic}>
                                Previous
                            </button>
                            <button onClick={handleNext} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50' disabled={!selectedTopic || roadmaps.find((r) => r.Topic_Name === selectedTopic)?.subtopics.slice(-1)[0] === selectedSubtopic}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Course;
