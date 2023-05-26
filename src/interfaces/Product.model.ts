import { CategoryModel } from './Category.model';
import { ColorModel } from './Color.model';
import { MemorySizeModel } from './MemorySize.model';
import { ProcessorModel } from './Processor.model';

export interface ProductModel {
    id: number;
    name: string;
    title: string;
    description: string;
    image: string;
    stock: number;
    price: number;
    status: number;
    memorySize: MemorySizeModel[];
    colors: ColorModel[];
    processor: ProcessorModel[];
    detail: string;
    specification: string;
    category: CategoryModel;
}