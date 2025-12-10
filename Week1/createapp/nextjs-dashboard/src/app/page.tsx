import '@/app/ui/global.css';
import styles from "./page.module.css"
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Hackathon from '@/app/ui/hackathon.jpg'
 
export default function Page() {
  return (
    <>
      <h1 className={`${lusitana.className}`}>Welcome</h1>
      <h1 className={styles.myClass}>Hoang Dinh Lam Hai - Intern Senlyzer!!</h1> 
      <p
        className="text-3xl font-bold underline"
      >
      This is a sample dashboard application built with Next.js and TypeScript. 
      </p>  
      <Image
        src={Hackathon}
        width={600}
        height={400}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      /> 
    </>
  )
}