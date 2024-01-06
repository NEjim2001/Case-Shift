import TextManipulator from "../components/TextManipulator";

export default function Home() {
  return (
    <main className='wrapper'>
      <section className='items-center justify-center text-center'>
        <div className='text-white text-4xl font-mono'>CASE SHIFT</div>
      </section>
      <TextManipulator />
    </main>
  );
}
