import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types';
import { deleteNote, readNotes } from '../hooks/api.ts';
import LoadingNotes from './LoadingNotes.tsx';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function Notes() {
  const navigate = useNavigate();
  const authContext = AuthContextConsumer();
  const currentUser = authContext?.currentUser;

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // ログインしていない場合の処理を入れる
      if (!currentUser) return;
      const notes = await readNotes(currentUser.uid);
      // メモがない場合の処理を入れる
      if (!notes) return;
      setNotes(notes);
      setIsLoaded(true);
    })();
  }, []);

  const handleNoteClick = async (note: Note) => {
    navigate('/go', {
      state: { id: note.id, subject: note.subject, content: note.content },
    });
  };

  const handleDeleteClick = async (id: string) => {
    const selectedNote = notes.find((note) => note.id === id);
    if (!selectedNote) return;
    const selectedNoteUpdatedAt = dayjs(selectedNote.updatedAt).format(
      'YYYY/MM/DD HH:mm:ss',
    );
    const isConfirmed = confirm(
      `このメモを削除しますか？\n\n${selectedNote.subject}\n\n${selectedNoteUpdatedAt}`,
    );
    if (!isConfirmed) return;
    const deletedNote = await deleteNote(id);
    if (!deletedNote) return;
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className="px-4 py-12 bg-stone-100">
      <h2 className="mb-8 mx-auto max-w-screen-md flex items-end gap-3 text-2xl">
        <span className="i-ph-notepad-thin text-3xl" />
        保存したメモ
      </h2>
      {isLoaded ? (
        <div className="mb-6 mx-auto max-w-screen-md">
          {notes.map((note) => (
            <div key={note.id} className="flex mb-3 w-full">
              <button
                type={'button'}
                className="py-3 px-4 w-full flex items-center justify-between gap-2 truncate
            rounded-s-lg border border-gray-200
            hover:bg-stone-200 focus:bg-stone-200"
                onClick={() => handleNoteClick(note)}
              >
                <span className="text-base text-gray-800 truncate">
                  {note.subject}
                </span>
                <span className="text-sm text-gray-400">
                  {dayjs(note.updatedAt).format('YYYY/MM/DD HH:mm:ss')}
                </span>
              </button>
              <button
                type={'button'}
                onClick={() => handleDeleteClick(note.id)}
                className="py-3 px-4 -ms-px rounded-e-lg
            border border-gray-200
            hover:bg-stone-200 focus:bg-stone-200"
              >
                <span className="i-ph-trash-light" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <LoadingNotes />
      )}
    </div>
  );
}

export default Notes;
