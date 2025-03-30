import { useEffect, useState } from 'react';

type Roadmap = {
  Topic_Name: string;
  subtopics: string[];
};

type Content = {
  heading: string;
  lesson: string;
};

const Course = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [selectedContents] = useState<Content[]>([{
    heading: 'Introduction to Systems',
    lesson: 'A system is a specific region in space or a quantity of matter chosen for study. Defining the system accurately is crucial for thermodynamics calculations and observations.',
  }]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/roadmap/generate`,
            {
                method: 'POST',
                credentials: 'include',
            }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch roadmaps');
        }
        const data = await response.json();
        setRoadmaps(data.response);
        
        // Set initial topic and subtopic when data is available
        if (data.response.length > 0) {
          setSelectedTopic(data.response[0].Topic_Name);
          setSelectedSubtopic(data.response[0].subtopics[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRoadmaps();
  }, []);

  return (
    <div className='p-4'>
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
        </div>
      </div>
    </div>
  );
};

export default Course;
