import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SearchIcon, GridIcon, ListIcon } from "lucide-react";
import { fetchTopics } from "../store/slices/topicsSlice";
import Layout from "../components/Layout/Layout";
import TopicCard from "../components/Topics/TopicCard";
import TopicList from "../components/Topics/TopicList";
import FilterDropdown from "../components/Topics/FilterDropdown";
import LoadingSkeleton from "../components/Common/LoadingSkeleton";
import EmptyState from "../components/Common/EmptyState";
import debounce from "lodash.debounce";

const Topics = () => {
  const dispatch = useDispatch();
  const { topics, loading, error } = useSelector((state) => state.topics);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("order");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () => debounce((term) => setSearchTerm(term), 300),
    []
  );

  const filteredTopics = useMemo(() => {
    let filtered = topics.filter((topic) => {
      const matchesSearch =
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || topic.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "progress":
        filtered.sort(
          (a, b) =>
            (b.progress?.percentage || 0) - (a.progress?.percentage || 0)
        );
        break;
      case "difficulty":
        filtered.sort((a, b) => b.totalProblems - a.totalProblems);
        break;
      default:
        filtered.sort((a, b) => a.order - b.order);
    }

    return filtered;
  }, [topics, searchTerm, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(topics.map((topic) => topic.category)),
    ];
    return uniqueCategories.sort();
  }, [topics]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("order");
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSkeleton />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">Error loading topics</div>
          <button
            onClick={() => dispatch(fetchTopics())}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Topics - DSA Sheet</title>
        <meta
          name="description"
          content="Explore DSA topics and track your learning progress"
        />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              DSA Topics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Master data structures and algorithms step by step
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <GridIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories.map((cat) => ({ value: cat, label: cat }))}
              placeholder="All Categories"
            />
            <FilterDropdown
              label="Sort by"
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "order", label: "Default Order" },
                { value: "name", label: "Name" },
                { value: "progress", label: "Progress" },
                { value: "difficulty", label: "Problem Count" },
              ]}
            />
            {(searchTerm || selectedCategory || sortBy !== "order") && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTopics.length} of {topics.length} topics
        </div>

        <AnimatePresence mode="wait">
          {filteredTopics.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTopics.map((topic, index) => (
                    <TopicCard
                      key={topic._id}
                      topic={topic}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTopics.map((topic, index) => (
                    <TopicList
                      key={topic._id}
                      topic={topic}
                      delay={index * 0.05}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <EmptyState
              title="No topics found"
              description="Try adjusting your filters or search terms"
              action={{
                label: "Clear Filters",
                onClick: handleClearFilters,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Topics;
