import { useState } from 'react';
import { Calendar, CheckCircle, Circle, Book, Code, Users, Target, Clock, ArrowRight } from 'lucide-react';

const SystemDesignTimeline = () => {
  const [completedItems, setCompletedItems] = useState(new Set());
  const [expandedPhases, setExpandedPhases] = useState(new Set([0])); // First phase expanded by default

  const toggleComplete = (phaseIndex, itemIndex) => {
    const key = `${phaseIndex}-${itemIndex}`;
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedItems(newCompleted);
  };

  const togglePhase = (index) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPhases(newExpanded);
  };

  const phases = [
    {
      title: "Foundation Building",
      period: "August 2025",
      icon: <Book className="w-5 h-5" />,
      color: "bg-blue-500",
      description: "Master the fundamentals and core concepts",
      topics: [
        "System Design Basics: scalability, reliability, availability",
        "Network fundamentals: TCP/UDP, HTTP/HTTPS, DNS",
        "Database fundamentals: SQL vs NoSQL, ACID properties",
        "Caching concepts: in-memory, distributed, CDN",
        "Load balancing: types, algorithms, health checks",
        "Basic security principles: authentication, authorization, encryption"
      ],
      resources: [
        "Book: 'Designing Data-Intensive Applications' by Martin Kleppmann",
        "Course: System Design Interview course (Educative/Grokking)",
        "Practice: Set up a simple load balancer with Nginx"
      ],
      milestone: "Complete system design fundamentals assessment"
    },
    {
      title: "Core Architecture Patterns",
      period: "September 2025",
      icon: <Code className="w-5 h-5" />,
      color: "bg-green-500",
      description: "Learn essential architectural patterns and trade-offs",
      topics: [
        "Monolithic vs Microservices architecture",
        "Service-oriented architecture (SOA) principles",
        "Event-driven architecture and message queues",
        "API design: REST, GraphQL, gRPC",
        "Database design: normalization, indexing, sharding",
        "Consistency patterns: eventual consistency, strong consistency"
      ],
      resources: [
        "Book: 'Building Microservices' by Sam Newman",
        "Practice: Design and implement a simple microservices system",
        "Study: Netflix, Uber, Amazon architecture case studies"
      ],
      milestone: "Design a complete e-commerce system architecture"
    },
    {
      title: "Scalability & Performance",
      period: "October 2025",
      icon: <Target className="w-5 h-5" />,
      color: "bg-purple-500",
      description: "Deep dive into scaling systems and performance optimization",
      topics: [
        "Horizontal vs vertical scaling strategies",
        "Database scaling: read replicas, sharding, partitioning",
        "Caching strategies: Redis, Memcached, application-level caching",
        "Content delivery networks (CDNs) and edge computing",
        "Performance monitoring and observability",
        "Capacity planning and auto-scaling"
      ],
      resources: [
        "Book: 'High Performance Browser Networking' by Ilya Grigorik",
        "Practice: Implement caching layer for a web application",
        "Study: How Instagram, WhatsApp handle millions of users"
      ],
      milestone: "Optimize a system to handle 10x traffic increase"
    },
    {
      title: "Advanced System Components",
      period: "November 2025",
      icon: <Users className="w-5 h-5" />,
      color: "bg-orange-500",
      description: "Master complex distributed system components",
      topics: [
        "Distributed databases: consensus algorithms, CAP theorem",
        "Message queues: Kafka, RabbitMQ, SQS",
        "Search systems: Elasticsearch, full-text search design",
        "Real-time systems: WebSockets, server-sent events",
        "Data processing: batch vs stream processing",
        "Security at scale: rate limiting, DDoS protection"
      ],
      resources: [
        "Book: 'Designing Distributed Systems' by Brendan Burns",
        "Practice: Build a real-time chat application with scaling",
        "Study: How Google Search, Twitter timeline work"
      ],
      milestone: "Design a distributed messaging system like Slack"
    },
    {
      title: "Interview Prep & Portfolio",
      period: "December 2025",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-red-500",
      description: "Prepare for interviews and showcase your knowledge",
      topics: [
        "System design interview patterns and frameworks",
        "Practice common interview questions (URL shortener, chat app, etc.)",
        "Trade-off analysis and decision justification",
        "Whiteboarding and diagramming skills",
        "Portfolio project: end-to-end system design",
        "Mock interviews and feedback sessions"
      ],
      resources: [
        "Book: 'System Design Interview' by Alex Xu",
        "Practice: LeetCode system design problems",
        "Create: Technical blog posts about your learning journey"
      ],
      milestone: "Successfully complete 5 mock system design interviews"
    }
  ];

  const getPhaseProgress = (phaseIndex) => {
    const phase = phases[phaseIndex];
    const totalItems = phase.topics.length;
    const completedCount = phase.topics.filter((_, itemIndex) => 
      completedItems.has(`${phaseIndex}-${itemIndex}`)
    ).length;
    return Math.round((completedCount / totalItems) * 100);
  };

  const overallProgress = Math.round(
    phases.reduce((sum, _, index) => sum + getPhaseProgress(index), 0) / phases.length
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          System Design & Software Architecture Mastery
        </h1>
        <p className="text-gray-600 mb-4">5-Month Learning Journey • August - December 2025</p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="text-lg font-bold text-blue-600">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {phases.map((phase, phaseIndex) => {
          const isExpanded = expandedPhases.has(phaseIndex);
          const progress = getPhaseProgress(phaseIndex);
          
          return (
            <div key={phaseIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => togglePhase(phaseIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${phase.color} text-white p-3 rounded-full`}>
                      {phase.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{phase.title}</h2>
                      <p className="text-gray-600">{phase.period}</p>
                      <p className="text-sm text-gray-500 mt-1">{phase.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700 mb-1">{progress}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${phase.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Learning Topics
                      </h3>
                      <div className="space-y-2">
                        {phase.topics.map((topic, itemIndex) => {
                          const isCompleted = completedItems.has(`${phaseIndex}-${itemIndex}`);
                          return (
                            <div 
                              key={itemIndex}
                              className="flex items-start space-x-3 p-2 rounded hover:bg-white cursor-pointer transition-colors"
                              onClick={() => toggleComplete(phaseIndex, itemIndex)}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              )}
                              <span className={`text-sm ${isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {topic}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Book className="w-4 h-4 mr-2" />
                          Resources
                        </h3>
                        <ul className="space-y-2">
                          {phase.resources.map((resource, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <ArrowRight className="w-3 h-3 mt-1 mr-2 flex-shrink-0" />
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Phase Milestone
                        </h4>
                        <p className="text-sm text-gray-700">{phase.milestone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Success Tips</h2>
        <ul className="space-y-2 text-sm">
          <li>• Practice system design problems weekly starting month 2</li>
          <li>• Build hands-on projects alongside theoretical learning</li>
          <li>• Join system design communities and discussion groups</li>
          <li>• Document your learning journey through blog posts or notes</li>
          <li>• Schedule mock interviews monthly starting October</li>
        </ul>
      </div>
    </div>
  );
};

export default SystemDesignTimeline;