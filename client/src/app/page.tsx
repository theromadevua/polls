import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">Welcome to the Polls!</h1>
        <p className="text-xl text-gray-700 mb-6">
          Here you can create and participate in polls. Join us and share your opinion!
        </p>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            href="/auth/registration"
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Register
          </Link>
        </div>
      </header>

      <footer className="mt-12 text-center text-gray-600 text-sm fixed bottom-[20]">
        <p>&copy; 2025 Polls. All rights reserved.</p>
      </footer>
    </div>
  );
}

