import React, { useState } from "react";
import { CodeEditor } from "./Editor";
import { Chatbot } from "./Chatbot";
import { AIWriter } from "./AIWriter";
import {
  BookOpen,
  Code2,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  PenTool,
  Layout,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface DashboardProps {
  email: string;
  onLogout: () => void;
}

const INITIAL_COURSE_CATEGORIES = [
  {
    id: "cat-web",
    title: "Web Development",
    courses: [
      {
        id: "c1",
        title: "Full Stack Web Development",
        progress: 15,
        lessons: Array.from({ length: 20 }, (_, i) => ({
          id: `c1-l${i + 1}`,
          title: `Lesson ${i + 1}: ${["HTML Basics", "CSS Styling", "JavaScript Fundamentals", "DOM Manipulation", "React Intro", "State & Props", "Hooks", "Routing", "Node.js Basics", "Express API", "MongoDB", "Authentication", "Deployment", "Advanced React", "Redux", "Next.js", "Tailwind CSS", "TypeScript", "Testing", "Final Project"][i]}`,
          completed: i < 3,
        })),
      },
      {
        id: "c3",
        title: "React & Next.js Mastery",
        progress: 0,
        lessons: Array.from({ length: 20 }, (_, i) => ({
          id: `c3-l${i + 1}`,
          title: `Lesson ${i + 1}: ${["React Refresher", "Advanced Hooks", "Context API", "Performance", "Next.js Setup", "Pages Router", "App Router", "Server Components", "Client Components", "Data Fetching", "API Routes", "Middleware", "Authentication", "Styling", "SEO", "Image Optimization", "Internationalization", "Testing", "Deployment", "Final Project"][i]}`,
          completed: false,
        })),
      },
    ],
  },
  {
    id: "cat-data",
    title: "Data Science & AI",
    courses: [
      {
        id: "c2",
        title: "Python & Data Science",
        progress: 0,
        lessons: Array.from({ length: 20 }, (_, i) => ({
          id: `c2-l${i + 1}`,
          title: `Lesson ${i + 1}: ${["Python Basics", "Data Types", "Control Flow", "Functions", "Lists & Dicts", "OOP", "File Handling", "NumPy", "Pandas Intro", "Data Cleaning", "Matplotlib", "Seaborn", "Scikit-Learn", "Linear Regression", "Classification", "Clustering", "Neural Networks", "Deep Learning", "NLP Basics", "Final Project"][i]}`,
          completed: false,
        })),
      },
      {
        id: "c4",
        title: "Machine Learning Basics",
        progress: 0,
        lessons: Array.from({ length: 20 }, (_, i) => ({
          id: `c4-l${i + 1}`,
          title: `Lesson ${i + 1}: ${["Intro to ML", "Supervised Learning", "Unsupervised Learning", "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests", "SVM", "K-Means", "PCA", "Model Evaluation", "Cross Validation", "Hyperparameter Tuning", "Ensemble Methods", "Neural Networks Intro", "TensorFlow Basics", "PyTorch Basics", "CNNs", "RNNs", "Final Project"][i]}`,
          completed: false,
        })),
      },
    ],
  },
  {
    id: "cat-mobile",
    title: "Mobile App Development",
    courses: [
      {
        id: "c5",
        title: "React Native for Beginners",
        progress: 0,
        lessons: Array.from({ length: 20 }, (_, i) => ({
          id: `c5-l${i + 1}`,
          title: `Lesson ${i + 1}: ${["Intro to React Native", "Expo Setup", "Core Components", "Styling", "Flexbox", "State & Props", "Handling Text Input", "ScrollViews", "Lists", "Navigation", "Stack Navigator", "Tab Navigator", "Fetching Data", "AsyncStorage", "Device Features", "Camera", "Location", "Animations", "Publishing", "Final Project"][i]}`,
          completed: false,
        })),
      },
      {
        id: "c6",
        title: "Flutter & Dart Masterclass",
        progress: 0,
        lessons: Array.from({ length: 20 }, (_, i) => ({
          id: `c6-l${i + 1}`,
          title: `Lesson ${i + 1}: ${["Dart Basics", "Functions & OOP", "Flutter Setup", "Widgets Intro", "Layouts", "Stateful Widgets", "Material Design", "Navigation", "Forms & Validation", "HTTP Requests", "JSON Parsing", "State Management", "Provider", "Riverpod", "Firebase Auth", "Firestore", "Animations", "Native Features", "App Store Release", "Final Project"][i]}`,
          completed: false,
        })),
      },
    ],
  },
];

export function Dashboard({ email, onLogout }: DashboardProps) {
  const [categories, setCategories] = useState(INITIAL_COURSE_CATEGORIES);
  const [expandedCourse, setExpandedCourse] = useState<string | null>("c1");
  const [activeLesson, setActiveLesson] = useState<{
    courseId: string;
    lessonId: string;
  }>({ courseId: "c1", lessonId: "c1-l1" });
  const [activeTab, setActiveTab] = useState<"courses" | "editor" | "writer">(
    "courses",
  );

  const allCourses = categories.flatMap((cat) => cat.courses);

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const startCourse = (courseId: string) => {
    const course = allCourses.find((c) => c.id === courseId);
    if (course && course.lessons.length > 0) {
      setActiveLesson({ courseId, lessonId: course.lessons[0].id });
      setExpandedCourse(courseId);
      setActiveTab("editor");
    }
  };

  const markLessonCompleted = () => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        courses: category.courses.map((course) => {
          if (course.id === activeLesson.courseId) {
            const updatedLessons = course.lessons.map((lesson) =>
              lesson.id === activeLesson.lessonId
                ? { ...lesson, completed: true }
                : lesson,
            );
            const completedCount = updatedLessons.filter(
              (l) => l.completed,
            ).length;
            const progress = Math.round(
              (completedCount / updatedLessons.length) * 100,
            );
            return { ...course, lessons: updatedLessons, progress };
          }
          return course;
        }),
      })),
    );
  };

  const currentCourse = allCourses.find((c) => c.id === activeLesson.courseId);
  const currentLessonData = currentCourse?.lessons.find(
    (l) => l.id === activeLesson.lessonId,
  );

  const getLessonContent = (lessonTitle: string = "Lesson") => {
    const cleanTitle = lessonTitle.split(": ")[1] || lessonTitle;
    return {
      html: `<h1>${cleanTitle}</h1>\n<p>Welcome to this lesson. Start coding below!</p>\n<div id="app"></div>`,
      css: `h1 {\n  color: #10b981;\n  font-family: sans-serif;\n}\nbody {\n  font-family: sans-serif;\n  padding: 20px;\n  background: #1e1e1e;\n  color: white;\n}`,
      js: `console.log("Loaded lesson: ${cleanTitle}");\n// Add your JavaScript here`,
    };
  };

  const lessonContent = getLessonContent(currentLessonData?.title);

  return (
    <div className="h-screen bg-zinc-950 flex flex-col font-sans text-zinc-300">
      {/* Top Navigation */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-1.5 rounded-lg">
              <Code2 className="w-5 h-5 text-emerald-500" />
            </div>
            <h1 className="font-semibold text-white tracking-tight hidden sm:block">
              CodeMaster Pro
            </h1>
          </div>

          <div className="flex items-center gap-2 border-l border-zinc-800 pl-6">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === "courses"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Courses
            </button>
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === "editor"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <Layout className="w-4 h-4" /> Workspace
            </button>
            <button
              onClick={() => setActiveTab("writer")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === "writer"
                  ? "bg-zinc-800 text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <PenTool className="w-4 h-4" /> AI Writer
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700/50 text-sm">
            <User className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 truncate max-w-[150px]">
              {email}
            </span>
            <span className="ml-2 px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded">
              PRO
            </span>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Only show in editor mode */}
        {activeTab === "editor" && (
          <aside className="w-72 border-r border-zinc-800 bg-zinc-900/50 hidden md:flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Course Outline
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-1">
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.courses.map((course) => (
                      <div key={course.id} className="mb-2">
                        <button
                          onClick={() => toggleCourse(course.id)}
                          className="w-full flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <BookOpen className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="text-sm font-medium text-white truncate">
                              {course.title}
                            </span>
                          </div>
                          {expandedCourse === course.id ? (
                            <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />
                          )}
                        </button>

                        {expandedCourse === course.id && (
                          <div className="mt-1 ml-4 pl-2 border-l border-zinc-800 space-y-1">
                            {course.lessons.map((lesson) => {
                              const isActive =
                                activeLesson.lessonId === lesson.id;
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() =>
                                    setActiveLesson({
                                      courseId: course.id,
                                      lessonId: lesson.id,
                                    })
                                  }
                                  className={`w-full flex items-center gap-2 p-2 text-xs rounded-lg transition-colors text-left ${
                                    isActive
                                      ? "bg-emerald-500/10 text-emerald-400 font-medium"
                                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                                  }`}
                                >
                                  <PlayCircle
                                    className={`w-3 h-3 shrink-0 ${lesson.completed ? "text-emerald-500" : ""}`}
                                  />
                                  <span className="truncate">
                                    {lesson.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Main Area */}
        <main className="flex-1 overflow-hidden flex flex-col min-w-0 bg-[#1d1f21]">
          {activeTab === "courses" && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-white">
                    Course Library
                  </h2>
                  <p className="text-zinc-400 mt-2">
                    Explore our comprehensive coding courses, each packed with
                    20 interactive lessons.
                  </p>
                </div>

                <div className="space-y-12">
                  {categories.map((category) => (
                    <section key={category.id}>
                      <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        {category.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.courses.map((course) => (
                          <div
                            key={course.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
                          >
                            <div className="flex-1">
                              <div className="bg-zinc-800/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Code2 className="w-6 h-6 text-emerald-400" />
                              </div>
                              <h4 className="text-lg font-bold text-white mb-2">
                                {course.title}
                              </h4>
                              <p className="text-sm text-zinc-400 mb-4">
                                Master the fundamentals and advanced concepts
                                through 20 hands-on lessons.
                              </p>

                              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                                <span className="flex items-center gap-1">
                                  <PlayCircle className="w-4 h-4" /> 20 Lessons
                                </span>
                                <span>{course.progress}% Completed</span>
                              </div>

                              <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-6">
                                <div
                                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            <button
                              onClick={() => startCourse(course.id)}
                              className="w-full py-2.5 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                            >
                              Start Course <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "editor" && (
            <div className="flex flex-col h-full p-4">
              <div className="mb-4 flex items-center justify-between shrink-0 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <div>
                  <p className="text-xs text-emerald-400 font-medium mb-1">
                    {currentCourse?.title}
                  </p>
                  <h2 className="text-xl font-semibold text-white">
                    {currentLessonData?.title}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Practice your coding skills here. Changes preview
                    automatically.
                  </p>
                </div>
                <div>
                  {!currentLessonData?.completed ? (
                    <button
                      onClick={markLessonCompleted}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark Completed
                    </button>
                  ) : (
                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Completed
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor
                  lessonId={activeLesson.lessonId}
                  initialHtml={lessonContent.html}
                  initialCss={lessonContent.css}
                  initialJs={lessonContent.js}
                />
              </div>
            </div>
          )}

          {activeTab === "writer" && (
            <div className="flex flex-col h-full p-4">
              <AIWriter />
            </div>
          )}
        </main>
      </div>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
