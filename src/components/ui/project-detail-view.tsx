import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Figma,
  Calendar,
  Tag,
  Paperclip,
  Users,
  MoreHorizontal,
  Download,
  Plus,
  ArrowRight,
  Edit2,
  X,
  Share2,
  ShieldAlert,
  Server
} from "lucide-react";

import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardHeader,
} from "./card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

type Assignee = {
  name: string;
  avatarUrl: string;
};

type ProjectTag = {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

type Attachment = {
  name: string;
  size: string;
  type: "pdf" | "figma" | "config";
};

type SubTask = {
  id: number;
  task: string;
  category: string;
  status: "Active" | "Scanning" | "Idle";
  dueDate: string;
};

export type ProjectDetailViewProps = {
  breadcrumbs: { label: string; href: string }[];
  title: string;
  status: string;
  assignees: Assignee[];
  dateRange: {
    start: string;
    end: string;
  };
  tags: ProjectTag[];
  description: string;
  attachments: Attachment[];
  subTasks: SubTask[];
};

const StatusBadge = ({ status }: { status: SubTask["status"] }) => {
  const statusStyles = {
    Active: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-700/60",
    Scanning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700/60",
    Idle: "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-400 border-gray-200 dark:border-gray-700/60",
  };
  return <Badge variant="outline" className={cn("font-medium", statusStyles[status])}>{status}</Badge>;
};

const FileIcon = ({ type }: { type: Attachment["type"] }) => {
  if (type === "pdf") return <FileText className="h-6 w-6 text-red-500" />;
  if (type === "figma") return <Figma className="h-6 w-6 text-purple-500" />;
  if (type === "config") return <Server className="h-6 w-6 text-cyan-500" />;
  return <Paperclip className="h-6 w-6 text-muted-foreground" />;
};

export function ProjectDetailView({
  breadcrumbs,
  title,
  status,
  assignees,
  dateRange,
  tags,
  description,
  attachments,
  subTasks,
}: ProjectDetailViewProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      }
    },
  };

  return (
    <Card className="w-full mx-auto overflow-hidden border border-white/[0.08] bg-white/[0.01] backdrop-blur-[60px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_0_rgba(0,0,0,0.6)] rounded-[2rem]">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
        <CardHeader className="p-4 md:px-8 border-b border-white/[0.05] bg-transparent">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="text-sm font-medium text-white/40">
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <span className="hover:text-white cursor-pointer transition-colors">{breadcrumb.label}</span>
                  {index < breadcrumbs.length - 1 && <span className="mx-2 text-white/20">/</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><Share2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><Edit2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><X className="h-4 w-4" /></Button>
            </div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-6 md:p-8 space-y-8">
            <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight text-white">{title}</motion.h1>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
                <div className="flex items-start gap-4">
                    <ShieldAlert className="h-5 w-5 mt-0.5 text-white/60" />
                    <div>
                        <p className="text-white/40 font-medium text-xs tracking-wider uppercase">System Status</p>
                        <Badge variant="outline" className="mt-1 font-semibold bg-emerald-900/40 text-emerald-400 border-emerald-700/60">
                            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            {status}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Users className="h-5 w-5 mt-0.5 text-white/60" />
                    <div>
                        <p className="text-white/40 font-medium text-xs tracking-wider uppercase">Authorized Personnel</p>
                        <div className="flex items-center gap-2 mt-1">
                          {assignees.map(assignee => (
                              <div key={assignee.name} className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 border border-white/10">
                                    <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                                    <AvatarFallback className="bg-[#222] text-white">{assignee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-white/80">{assignee.name}</span>
                              </div>
                          ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 mt-0.5 text-white/60" />
                    <div>
                        <p className="text-white/40 font-medium text-xs tracking-wider uppercase">Deployment Timeline</p>
                        <p className="font-medium flex items-center gap-2 mt-1 text-white/80">
                            {dateRange.start} <ArrowRight className="h-4 w-4 text-white/40" /> {dateRange.end}
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Tag className="h-5 w-5 mt-0.5 text-white/60" />
                    <div>
                        <p className="text-white/40 font-medium text-xs tracking-wider uppercase">Modules</p>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                            {tags.map((tag) => <Badge key={tag.label} variant={tag.variant} className="bg-white/5 hover:bg-white/10 text-white/80 border-none rounded-full px-3 font-medium shadow-sm backdrop-blur-md">{tag.label}</Badge>)}
                        </div>
                    </div>
                </div>
                 <div className="flex items-start gap-4 col-span-1 md:col-span-2">
                    <FileText className="h-5 w-5 mt-0.5 text-white/60" />
                    <div>
                        <p className="text-white/40 font-medium text-xs tracking-wider uppercase">Description</p>
                        <p className="mt-1.5 text-white/70 leading-relaxed font-medium">{description}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 pt-6 border-t border-white/[0.05]">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white flex items-center gap-2"><Paperclip className="h-5 w-5 text-white/50"/>Resources <Badge variant="secondary" className="bg-white/10 text-white border-none rounded-full">{attachments.length}</Badge></h3>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5 rounded-full"><Download className="h-4 w-4 mr-2" />Pull Logs</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {attachments.map(file => (
                        <div key={file.name} className="flex items-center gap-3 p-4 border border-white/[0.05] rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group shadow-sm">
                            <FileIcon type={file.type} />
                            <div className="flex-1">
                                <p className="font-medium text-sm text-white/90 truncate group-hover:text-white">{file.name}</p>
                                <p className="text-xs text-white/40">{file.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4 pt-6 border-t border-white/[0.05]">
                <h3 className="font-semibold text-white">Active Processes</h3>
                <div className="overflow-x-auto rounded-2xl border border-white/[0.05] bg-white/[0.01]">
                    <Table>
                        <TableHeader className="bg-transparent">
                            <TableRow className="border-white/[0.05] hover:bg-transparent">
                                <TableHead className="w-[50px] text-white/40 font-semibold text-xs tracking-wider">PID</TableHead>
                                <TableHead className="text-white/40 font-semibold text-xs tracking-wider">PROCESS</TableHead>
                                <TableHead className="text-white/40 font-semibold text-xs tracking-wider">TYPE</TableHead>
                                <TableHead className="text-white/40 font-semibold text-xs tracking-wider">STATE</TableHead>
                                <TableHead className="text-right text-white/40 font-semibold text-xs tracking-wider">UPTIME</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subTasks.map((task) => (
                                <motion.tr variants={itemVariants} key={task.id} className="border-white/[0.02] hover:bg-white/[0.03] transition-colors">
                                    <TableCell className="text-white/40 text-sm font-medium">{task.id}</TableCell>
                                    <TableCell className="font-medium text-white/90">{task.task}</TableCell>
                                    <TableCell className="text-white/60 text-sm font-medium">{task.category}</TableCell>
                                    <TableCell><StatusBadge status={task.status} /></TableCell>
                                    <TableCell className="text-right text-white/50 text-sm font-medium">{task.dueDate}</TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  );
}
