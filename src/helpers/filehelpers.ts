import { promises } from "dns";
import { resolve } from "path";


export const convertFileToLink = (file: File): Promise<string> =>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target?.result as string); 
        };
        reader.onerror = function (event) {
            reject(new Error("Erro reading the file.")); 
        };

        reader.readAsDataURL(file);
    });
   
};

export const convertFileToBlob = (file: File): Promise<Blob> =>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();

        reader.onload = function (event) {
            if (event.target?.result instanceof ArrayBuffer){
                const blob = new Blob([event.target.result], { type: file.type });
                resolve(blob);
            }else {
                reject(new Error("Error converting file to Blob."));
            }
        };
        reader.onerror = function () {
            reject(new Error("Erro reading the file.")); 
        };

        reader.readAsArrayBuffer(file);
    });
   
};

export const convertBlobToUrl = (blob: Blob): string => {
    return URL.createObjectURL(blob);
};


