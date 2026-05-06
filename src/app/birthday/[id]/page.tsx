import { BirthdayView } from './BirthdayView';

export default function BirthdayPage({ params }: { params: { id: string } }) {
  return <BirthdayView id={params.id} />;
}