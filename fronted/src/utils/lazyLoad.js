import { lazy } from "react";

/**
 * With the file path and the export name make a code splitting of that component
 * @param {string} path the file path relative to the lazy load function
 * @param {string} namedExport the desire element
 * @returns 
 */
export const lazyLoad = (path, namedExport) => {
   return lazy(async () => {
      const promise = wait(400).then(() => import(/* @vite-ignore */path));
      if (namedExport == null) return promise;
      else {
         const module = await promise;
         return ({ default: module[namedExport] });
      }
   });
};

/**
 * Wait a specific time to execute the resolve function
 * @param {number} time the time to wait for execute the function
 * @returns 
 */
export const wait = (time) =>  {
   return new Promise((resolve) => {
      setTimeout(resolve, time);
   });
};