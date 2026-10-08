import markup from './markup';
import Effects from './effects';

export default function Home() {
  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: markup }} />
      <Effects />
    </>
  );
}
