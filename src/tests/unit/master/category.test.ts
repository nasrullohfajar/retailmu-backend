import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  beforeAll,
  afterAll,
  afterEach,
  describe,
  it,
  expect,
} from '@jest/globals';
import * as CategoryService from '../../../service/master/category.service';
import Category from '../../../models/master/category.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Category.deleteMany({});
});

describe('Category Service', () => {
  describe('Create Category', () => {
    it('should create a new category successfully', async () => {
      const categoryData = {
        name: 'Makanan',
        description: 'Kategori ini berisi makanan',
      };
      const result = await CategoryService.createCategory(categoryData);

      expect(result.name).toBe(categoryData.name);
      expect(result.description).toBe(categoryData.description);
      expect(result.isDeleted).toBe(false);
    });
  });

  describe('Get All Category', () => {
    it('should get all categories successfully', async () => {
      await Category.create([
        { name: 'Minuman', description: 'Kategori ini berisi minuman' },
        { name: 'ATK', description: 'Kategori ini berisi ATK' },
        {
          name: 'Elektronik',
          description: 'Kategori ini berisi elektronik',
          isDeleted: true,
        },
      ]);

      const query = { search: '', page: '1', limit: '10' };
      const result = await CategoryService.getAllCategories(query);

      expect(result.data.length).toBe(2);
      expect(result.total).toBe(2);
    });

    it('should get all categories with search successfully', async () => {
      await Category.create([
        { name: 'Minuman', description: 'Kategori ini berisi minuman' },
        { name: 'ATK', description: 'Kategori ini berisi ATK' },
      ]);
      const query = { search: 'minuman', page: '1', limit: '10' };
      const result = await CategoryService.getAllCategories(query);

      expect(result.data.length).toBe(1);
      expect(result.total).toBe(1);
      expect(result.data[0]?.name).toBe('Minuman');
    });
  });

  describe('Get Category By Id', () => {
    it('should get category by id successfully', async () => {
      const category = await Category.create({ name: 'Jasa' });
      const result = await CategoryService.getCategoryById(
        category._id.toString()
      );

      expect(result.name).toBe('Jasa');
    });

    it('should throw error if category is deleted', async () => {
      const category = await Category.create({
        name: 'Expired',
        isDeleted: true,
      });

      await expect(
        CategoryService.getCategoryById(category._id.toString())
      ).rejects.toThrow();
    });
  });

  describe('Update Category', () => {
    it('should update category successfully', async () => {
      const category = await Category.create({ name: 'Lama' });
      const updateData = { name: 'Baru' };
      const result = await CategoryService.updateCategory(
        category._id.toString(),
        updateData
      );

      expect(result.name).toBe('Baru');
    });
  });

  describe('Delete Category', () => {
    it('should set isDeleted to true and record deleteAt', async () => {
      const category = await Category.create({ name: 'Hapus' });
      const result = await CategoryService.deleteCategory(
        category._id.toString()
      );

      expect(result.isDeleted).toBe(true);
      expect(result.deletedAt).toBeDefined;

      const checkDb = await Category.findOne({
        _id: category._id,
        isDeleted: false,
      });
      expect(checkDb).toBeNull;
    });
  });
});
