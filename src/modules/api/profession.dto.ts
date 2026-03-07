export interface Profession {
  id: string;
  skillCosts: any;
  professionalSkills: [];
  description: string;
  imageUrl?: string;
}

export interface CreateProfessionDto {
  id: string;
  skillCosts: any;
  professionalSkills: [];
  description: string;
  imageUrl?: string;
}

export interface UpdateProfessionDto {
  skillCosts?: any;
  professionalSkills?: [];
  description?: string;
  imageUrl?: string;
}
