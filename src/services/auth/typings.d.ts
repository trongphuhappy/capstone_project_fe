declare namespace API {
  enum AuthRole {
    USER = "user",
    ADMIN = "admin",
    LESSOR = "lessor",
  }

  type TAuthResponse = {
    accessToken: string;
  };

  type TAuthProfile = {
    id: number;
    createdAt: string;
    updatedAt: string;
    userName: string;
    image?: string;
    email: string;
    avatar?: string;
    address?: string;
    detailedAddress?: string;
    dob?: string;
    phoneNumber?: string;
    fullName: string;
    role: AuthRole;
    citizenId?: string;
    citizenCardFront?: string;
    citizenCardBack?: string;
    lessorId?: number;
  };
}
