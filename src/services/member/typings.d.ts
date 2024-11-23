declare namespace REQUEST {
  type TUpdateAvatar = {
    cropAvatar: File;
    fullAvatar: File;
  };

  type TUpdateCoverPhoto = {
    cropCoverPhoto: File;
    fullCoverPhoto: File;
  };
}

declare namespace API {
  enum LoginType {
    Local = 1,
    Google = 2,
  }

  enum GenderType {
    Male = 1,
    Female = 2,
  }

  enum RoleType {
    Admin = 1,
    Member = 2,
  }

  type TImageProfile = {
    cropAvatarUrl: string;
    cropAvatarId: string;
    fullAvatarUrl: string;
    fullAvatarId: string;
    cropCoverPhotoUrl: string;
    cropCoverPhotoId: string;
    fullCoverPhotoUrl: string;
    fullCoverPhotoId: string;
  };

  type TProfile = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cropAvatarUrl?: string | null;
    cropAvatarId?: string | null;
    fullAvatarUrl?: string | null;
    fullAvatarId?: string | null;
    cropCoverPhotoUrl?: string | null;
    cropCoverPhotoId?: string | null;
    fullCoverPhotoUrl?: string | null;
    fullCoverPhotoId?: string | null;
    loginType: LoginType;
    genderType: GenderType;
    roleUserId: RoleType;
  };
}
