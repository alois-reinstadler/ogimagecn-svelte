import { error } from '@sveltejs/kit';import {guides} from '$lib/site/nav.js';import {guideDocs} from '$lib/site/guides.js';
export const entries=()=>guides.map(({slug})=>({guide:slug}));
export const load=({params})=>{const doc=guideDocs[params.guide];if(!doc)error(404,'Anleitung nicht gefunden');return {guide:params.guide,doc};};
