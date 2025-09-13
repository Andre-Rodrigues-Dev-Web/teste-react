import type { IconType } from "react-icons";
import { FaDatabase } from "react-icons/fa";
import { FaCode, FaDesktop, FaServer } from "react-icons/fa6";
interface TechStackItem {
  name: string;
  svg: string;
  adaptive?: boolean;
}

interface TechStackList {
  title: string;
  Icon: IconType;
  items: TechStackItem[];
}
const frontEndList: TechStackList = {
  title: "Front-End",
  Icon: FaDesktop,
  items: [
    {
      name: "HTML",
      svg: "html",
    },
    {
      name: "CSS",
      svg: "css",
    },
    {
      name: "Javascript",
      svg: "javascript",
    },
    {
      name: "Typescript",
      svg: "typescript",
    },
    {
      name: "React",
      svg: "react",
    },
    {
      name: "Electron",
      svg: "electron",
    },
    {
      name: "Tauri",
      svg: "tauri",
    },
  ],
};
const backEndList: TechStackList = {
  title: "Back-End",
  Icon: FaServer,
  items: [
    {
      name: "Node.js",
      svg: "node",
    },
    {
      name: "Deno",
      svg: "deno",
      adaptive: true,
    },
    {
      name: "Rust",
      svg: "rust",
      adaptive: true,
    },
    {
      name: "Python",
      svg: "python",
    },
    {
      name: "C#",
      svg: "csharp",
    },
    {
      name: "Java",
      svg: "java",
    },
    {
      name: "Express(JS)",
      svg: "express",
      adaptive: true,
    },
    {
      name: "Apollo GraphQL",
      svg: "apollo",
      adaptive: true,
    },
  ],
};
const dbList: TechStackList = {
  title: "Bancos de Dados",
  Icon: FaDatabase,
  items: [
    {
      name: "MySQL",
      svg: "mysql",
      adaptive: true,
    },
    {
      name: "Microsft SQL Server (MSSQL)",
      svg: "mssql",
    },
    {
      name: "SQLite",
      svg: "sqlite",
    },
    {
      name: "MongoDB",
      svg: "mongodb",
    },
  ],
};
const devOpsList: TechStackList = {
  title: "Ferramentas de desenvolvimento e DevOps",
  Icon: FaCode,
  items: [
    {
      name: "Git",
      svg: "git",
    },
    {
      name: "Github",
      svg: "github",
      adaptive: true,
    },
    {
      name: "BitBucket",
      svg: "bitbucket",
    },
    {
      name: "Docker",
      svg: "docker",
    },
  ],
};
export const techStackList: TechStackList[] = [
  frontEndList,
  backEndList,
  dbList,
  devOpsList,
];
