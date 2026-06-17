import { useEffect, useState } from "react";
import { getAllNotes } from "../../api/notesApi";

export default function StudentNotesPage() {

  const [notes, setNotes] =
    useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {

    try {

      const data =
        await getAllNotes();

      setNotes(data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        My Notes
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Description
              </th>

              <th className="p-3 text-left">
                File
              </th>

            </tr>

          </thead>

          <tbody>

            {
              notes.map(note => (

                <tr
                  key={note.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {note.title}
                  </td>

                  <td className="p-3">
                    {note.description}
                  </td>

                  <td className="p-3">

                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      Open
                    </a>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  );
}