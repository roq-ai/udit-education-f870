import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TutorialInterface {
  id?: string;
  title: string;
  content: string;
  creator_id?: string;
  editor_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  user_tutorial_creator_idTouser?: UserInterface;
  user_tutorial_editor_idTouser?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface TutorialGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  creator_id?: string;
  editor_id?: string;
  organization_id?: string;
}
