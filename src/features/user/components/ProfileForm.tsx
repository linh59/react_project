import type { AppDispatch, RootState } from "@/app/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Edit, LocateIcon, Mail, Save, User, X } from "lucide-react";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UpdateProfileRequest } from "../authTypes";
import { updateUser } from "@/features/auth/authActions";
import { useForm } from 'react-hook-form';
import { minLength, required } from "@/lib/validationRules";

const ProfileForm = () => {
    const userInfo = useSelector((state: RootState) => state.auth.profile);
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<UpdateProfileRequest>({
        defaultValues: {
            first_name: userInfo?.first_name || "",
            last_name: userInfo?.last_name || "",
            email: userInfo?.email || "",
            phone: userInfo?.phone || "",
            address: userInfo?.address || "",
        },
    });
    const handleSave = async (data: UpdateProfileRequest) => {
        await dispatch(updateUser(data))
        setIsEditing(false);

    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <>
            {userInfo ? (
                <form onSubmit={handleSubmit(handleSave)}>
                    <Card variant="enhanced" >
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-baloo">Profile Information</CardTitle>

                                {!isEditing ? (
                                    <Button onClick={() => setIsEditing(true)} variant="outline">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button type="submit" size="sm" disabled={!isDirty || isSubmitting}>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save
                                        </Button>
                                        <Button onClick={handleCancel} variant="outline" size="sm">
                                            <X className="h-4 w-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-6">
                                {/* <Avatar className="h-24 w-24">
                        <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                        <AvatarFallback className="text-lg">
                            <User className="h-8 w-8" />
                        </AvatarFallback>
                    </Avatar> */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">{userInfo.display_name}</h3>
                                    <Badge variant="secondary">{userInfo.role}</Badge>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Last Name</Label>
                                    {isEditing ? (
                                        <div>
                                            <Input {...register("last_name", {
                                                ...required(),
                                                ...minLength(2),
                                            })}
                                            />
                                            {errors.last_name && (
                                                <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span>{userInfo.last_name}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">First Name</Label>
                                    {isEditing ? (
                                        <Input {...register("first_name")}
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span>{userInfo.first_name}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Address</Label>
                                    {isEditing ? (
                                        <Input  {...register("address")}
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                                            <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>{userInfo.address}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    {isEditing ? (
                                        <Input {...register("email")}
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{userInfo.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            ) : (
                <div> No data</div>
            )}

        </>
    );
};

export default ProfileForm;