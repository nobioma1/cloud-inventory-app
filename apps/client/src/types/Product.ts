export interface Product {
  id: string;
  name: string;
  description: string;
  quantityInStock: number;
  createdAt: Date;
  updatedAt: Date;
  workspace: {
    id: string;
  };
}

export interface ProductReport {
  id: string;
  report: string;
  severity: string;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: string;
  };
}
