import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_, arge) => {
            const { 
                sortKey, 
                sortValue, 
                currentPage, 
                limitItems,
                filterKey,
                filterValue,
                keyword,
            } = arge;

            const find = {
                deleted: false
            }

            // sort
            const sort = {};

            if(sortKey && sortValue){
                sort[sortKey] = sortValue;
            }
            // end sort 

            // pagination
            const skip = (currentPage - 1) * limitItems
            // end pagination

            // filter
            if(filterKey && filterValue){
                find[filterKey] = filterValue;
            }
            // end filter 

            // search 
            if(keyword){
                const keywordRegex = new RegExp(keyword, "i");
                find["title"] = keywordRegex;
            }
            // end search

            const articles = await Article.find(find).sort(sort).limit(limitItems).skip(skip);

            return articles;
        },

        getArticle: async (_, args) => {
            const { id } = args;

            const article = await Article.findOne({
                _id: id, 
                deleted: false
            });

            return article;
        },
    },

    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;

            const category = await Category.findOne({
                _id: categoryId
            });

            return category;
        }
    },

    Mutation: {
        createArticle: async (_, args) => {
            const { article } = args;

            const record = new Article(article);
            await record.save();

            return record;
        },

        deleteArticle: async (_, args) => {
            const { id } = args;

            await Article.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date(),
            });

            return "Đã xoá!";
        },

        updateArticle: async (_, args) => {
            const { id, article } = args;

           await Article.updateOne({
                _id: id,
                deleted: false
            }, article);

            const record = await Article.findOne({
                _id: id
            });

            return record;
        },
    }
};