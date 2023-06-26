import { ColorModel } from './Color.model';
import { MemorySizeModel } from './MemorySize.model';
import { ProcessorModel } from './Processor.model';
import { ProductModel } from './Product.model';

export interface SaleDetailModel {
    id?: number;
    product?: ProductModel;
    color?: ColorModel;
    processor?: ProcessorModel;
    memorySize?: MemorySizeModel;
    quantity: number;
    price: number;
    note?: string;
    // saleHeader?: SaleModel;
}
