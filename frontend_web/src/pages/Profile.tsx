import { useUser } from "../context/user.context";

const Profile = () => {
  const userContext = useUser();
  if (!userContext) {
    return <div>Loading...</div>; // Fallback UI
  }

  const { user, loading } = userContext;

  if (loading) return <div>Loading user...</div>;


  return (
    <div>
      <div>Welcome {user?.user?.name} to Hackvita</div>
      <div>You have been authenticated</div>
      <button>Logout</button>
    </div>
  );
};

export default Profile