
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileForm from '../components/ProfileForm';

const UserProfile = () => {
  // const [userInfo, setUserInfo] = useState({
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   role: 'Student',
  //   avatar: '/placeholder.svg'
  // });


  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-baloo font-bold text-primary mb-4">User Profile</h1>
        <p className="text-lg text-muted-foreground font-poppins">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6">

        <ProfileForm />
        <Card variant="enhanced">
          <CardHeader>
            <CardTitle className="text-xl font-baloo">Account Statistics</CardTitle>
            <CardDescription>Your learning progress and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">24</div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">156</div>
                <div className="text-sm text-muted-foreground">Study Hours</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">8</div>
                <div className="text-sm text-muted-foreground">Certificates Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
