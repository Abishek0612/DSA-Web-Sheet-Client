import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  BookOpenIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { fetchTopics } from "../../store/slices/topicsSlice";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Common/Button";
import Card from "../../components/Common/Card";
import Badge from "../../components/Common/Badge";
import Modal from "../../components/Common/Modal";
import TopicForm from "./TopicForm";
import ProblemForm from "./ProblemForm";
import ConfirmDialog from "./ConfirmDialog";
import api from "../../services/api";

const TopicManagement = () => {
  const dispatch = useDispatch();
  const { topics, loading } = useSelector((state) => state.topics);

  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingProblem, setEditingProblem] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  const handleCreateTopic = () => {
    setEditingTopic(null);
    setIsTopicModalOpen(true);
  };

  const handleEditTopic = (topic) => {
    setEditingTopic(topic);
    setIsTopicModalOpen(true);
  };

  const handleDeleteTopic = (topic) => {
    setDeleteItem({ type: "topic", item: topic });
    setIsDeleteModalOpen(true);
  };

  const handleAddProblem = (topicId) => {
    setSelectedTopicId(topicId);
    setEditingProblem(null);
    setIsProblemModalOpen(true);
  };

  const handleEditProblem = (topicId, problem) => {
    setSelectedTopicId(topicId);
    setEditingProblem(problem);
    setIsProblemModalOpen(true);
  };

  const handleDeleteProblem = (topicId, problem) => {
    setDeleteItem({ type: "problem", item: problem, topicId });
    setIsDeleteModalOpen(true);
  };

  const handleTopicSubmit = async (formData) => {
    try {
      if (editingTopic) {
        await api.put(`/topics/${editingTopic._id}`, formData);
        toast.success("Topic updated successfully!");
      } else {
        await api.post("/topics", formData);
        toast.success("Topic created successfully!");
      }
      setIsTopicModalOpen(false);
      dispatch(fetchTopics());
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleProblemSubmit = async (formData) => {
    try {
      if (editingProblem) {
        await api.put(
          `/topics/${selectedTopicId}/problems/${editingProblem._id}`,
          formData
        );
        toast.success("Problem updated successfully!");
      } else {
        await api.post(`/topics/${selectedTopicId}/problems`, formData);
        toast.success("Problem added successfully!");
      }
      setIsProblemModalOpen(false);
      dispatch(fetchTopics());
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteItem.type === "topic") {
        await api.delete(`/topics/${deleteItem.item._id}`);
        toast.success("Topic deleted successfully!");
      } else {
        await api.delete(
          `/topics/${deleteItem.topicId}/problems/${deleteItem.item._id}`
        );
        toast.success("Problem deleted successfully!");
      }
      setIsDeleteModalOpen(false);
      dispatch(fetchTopics());
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Topic Management - DSA Sheet</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Topic Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage DSA topics and problems
            </p>
          </div>
          <Button
            onClick={handleCreateTopic}
            leftIcon={<PlusIcon className="w-4 h-4" />}
          >
            Add Topic
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {topics.map((topic) => (
            <motion.div
              key={topic._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{topic.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {topic.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{topic.category}</Badge>
                        <Badge variant="outline">
                          {topic.problems?.length || 0} problems
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddProblem(topic._id)}
                      leftIcon={<PlusIcon className="w-3 h-3" />}
                    >
                      Add Problem
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTopic(topic)}
                      leftIcon={<EditIcon className="w-3 h-3" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTopic(topic)}
                      leftIcon={<TrashIcon className="w-3 h-3" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {topic.description}
                </p>

                {topic.problems && topic.problems.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Problems:
                    </h4>
                    {topic.problems.map((problem) => (
                      <div
                        key={problem._id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              problem.difficulty === "Easy"
                                ? "success"
                                : problem.difficulty === "Medium"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {problem.difficulty}
                          </Badge>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {problem.name}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleEditProblem(topic._id, problem)
                            }
                          >
                            <EditIcon className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleDeleteProblem(topic._id, problem)
                            }
                          >
                            <TrashIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        title={editingTopic ? "Edit Topic" : "Create Topic"}
        size="lg"
      >
        <TopicForm
          topic={editingTopic}
          onSubmit={handleTopicSubmit}
          onCancel={() => setIsTopicModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isProblemModalOpen}
        onClose={() => setIsProblemModalOpen(false)}
        title={editingProblem ? "Edit Problem" : "Add Problem"}
        size="lg"
      >
        <ProblemForm
          problem={editingProblem}
          onSubmit={handleProblemSubmit}
          onCancel={() => setIsProblemModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteItem?.type}`}
        message={`Are you sure you want to delete "${deleteItem?.item?.name}"? This action cannot be undone.`}
      />
    </Layout>
  );
};

export default TopicManagement;
