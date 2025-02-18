import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-base-100 min-h-[calc(100vh-68px)] px-6 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to BrainShare
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          BrainShare is a social platform where users can share ideas, post
          content, engage in discussions, and enjoy premium features through
          Gold Badge membership.
        </motion.p>
      </div>

      {/* Mission & Vision */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <motion.div
          className="p-6 bg-white shadow-md rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600">
            Our mission is to create a knowledge-sharing platform where users
            can collaborate, exchange insights, and grow together.
          </p>
        </motion.div>
        <motion.div
          className="p-6 bg-white shadow-md rounded-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600">
            We envision a digital space where people can freely exchange ideas
            and connect without barriers, making learning accessible to all.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          Why Choose BrainShare?
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          <motion.div
            className="p-6 bg-white shadow-md rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-secondary">
              Engaging Community
            </h3>
            <p className="text-gray-600">
              Interact with thousands of users and gain knowledge.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white shadow-md rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-secondary">
              Premium Features
            </h3>
            <p className="text-gray-600">
              Unlock exclusive benefits with our Gold Badge membership.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white shadow-md rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-secondary">
              Admin Moderation
            </h3>
            <p className="text-gray-600">
              Enjoy a secure and well-managed environment.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
