import { useTeacher } from '../contexts/TeacherContext';

const List = () => {
  const { teachers, createTeacher } = useTeacher();

  if (teachers.length === 0) {
    return (
      <div
        className="cursor-pointer border bg-green-600 p-4"
        onClick={() => {
          createTeacher({
            id: 1,
            name: 'John Doe',
            subject: 'Mathematics',
          });
        }}
      >
        No teachers found
      </div>
    );
  }
  return teachers.map((teacher) => (
    <div key={teacher.id} className="teacher-card">
      <h2>{teacher.name}</h2>
    </div>
  ));
};

export default List;
