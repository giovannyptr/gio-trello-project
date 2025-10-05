import {
  FaBookReader,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaLightbulb,
  FaMobileAlt,
  FaProjectDiagram,
  FaRocket,
  FaShoppingCart,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardList,
  FaExclamationTriangle,
  FaFileAlt,
  FaFolderOpen,
  FaGlobe,
  FaHome,
  FaInfoCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoReaderSharp, IoAnalyticsSharp } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";
import { SingleIcon } from "./types";

export const allIconsArray: SingleIcon[] = [
  { id: 1, icon: FaBookReader, isSelected: false },
  { id: 2, icon: IoReaderSharp, isSelected: false },
  { id: 3, icon: LuFileSpreadsheet, isSelected: false },
  { id: 4, icon: FaChartLine, isSelected: false }, // Analytics/Charts
  { id: 5, icon: FaCode, isSelected: false }, // Development
  { id: 6, icon: FaDatabase, isSelected: false }, // Database
  { id: 7, icon: FaLightbulb, isSelected: false }, // Ideas/Brainstorming
  { id: 8, icon: FaMobileAlt, isSelected: false }, // Mobile Apps
  { id: 9, icon: FaProjectDiagram, isSelected: false }, // Project Management
  { id: 10, icon: FaRocket, isSelected: false }, // Launch/Deployment
  { id: 11, icon: FaShoppingCart, isSelected: false }, // E-commerce
  { id: 12, icon: FaUserTie, isSelected: false }, // Business/Professional
  { id: 13, icon: IoAnalyticsSharp, isSelected: false }, //Another Analytics Icon
  { id: 14, icon: FaCalendarAlt, isSelected: false }, // Calendar/Schedule
  { id: 15, icon: FaCheckCircle, isSelected: false }, // Success/Completion
  { id: 16, icon: FaClipboardList, isSelected: false }, // Task List/Checklist
  { id: 17, icon: FaExclamationTriangle, isSelected: false }, // Warning/Error
  { id: 18, icon: FaFileAlt, isSelected: false }, // File/Document
  { id: 19, icon: FaFolderOpen, isSelected: false }, // Folder/Directory
  { id: 20, icon: FaGlobe, isSelected: false }, // World/Global
  { id: 21, icon: FaHome, isSelected: false }, // Home/Dashboard
  { id: 22, icon: FaInfoCircle, isSelected: false }, // Information/Details
  { id: 23, icon: FaMapMarkerAlt, isSelected: false }, // Location/Map
];
