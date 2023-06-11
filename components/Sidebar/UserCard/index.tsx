import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface UserCardProps {
  image?: string | null;
  name?: string | null;
  email: string;
}

const UserCard: React.FunctionComponent<UserCardProps> = ({
  image,
  name,
  email,
}) => {
  return (
    <div className='flex flex-col items-center gap-3'>
      <Avatar className='h-20 w-20'>
        <AvatarImage src={image!} alt='Profile Picture' />
        <AvatarFallback>
          {name
            ?.split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>

      <span className='font-bold'>{name}</span>
      <span className='font-thin text-gray-400'>{email}</span>
    </div>
  );
};

export default UserCard;
