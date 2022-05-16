interface SeedData {
    entries:SeedEntry[];
}
interface SeedEntry{
    description:string;
    status:string;
    createdAt:number;
}
export const seedData: SeedData = {
  entries: [
    {
      description: "Pending: lorem",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "In Progress: lorem",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Finished: lorem",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};