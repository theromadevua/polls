export const SurveyHeader = ({ title, description, user }: { title: string; description?: string, user: {username: string, avatar: string} }) => (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="flex items-center space-x-4 mb-4">
        <img src={`http://localhost:5000/${user.avatar}`} alt={user.username} className="w-12 h-12 rounded-[10]" />
        <div>
          <p className="text-gray-800 font-semibold">{user.username}</p>
          <p className="text-gray-600 text-sm">Survey Creator</p>
        </div>
      </div>
      {description && <p className="text-gray-600 text-lg mb-4">{description}</p>}
    </div>
  );