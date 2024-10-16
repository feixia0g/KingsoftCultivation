const tagsService = require('../service/tag');
const dataService = require('../service/data');

/**
 * 新增标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function addTag(ctx) {
  try {
    const { name } = ctx.request.body;

    if (!name) {
      throw { status: 400, message: 'name不能为空' };
    }

    if (name.length > 10) {
      throw { status: 400, message: 'name长度不能超过10个字符' };
    }

    await tagsService.addTag(name);

    const responseData = {
      code: 201,
      msg: '添加成功',
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 标签查询接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function getTags(ctx) {
  try {
    const { data = [] } = await tagsService.getTags();

    const responseData = {
      code: 200,
      msg: '查询成功',
      data,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 修改标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function editTag(ctx) {
  try {
    const { id, name } = ctx.request.body;

    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }

    if (!name) {
      throw { status: 400, message: 'name不能为空' };
    }

    await tagsService.editTag(id, name);

    const responseData = {
      code: 201,
      msg: '修改成功',
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 删除标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function delTag(ctx) {
  try {
    const { id } = ctx.request.query;

    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }

    const { data } = await dataService.getData();
    const isThisIdWasUsed = data.some(item => item.tags.includes(id));

    if (isThisIdWasUsed) {
      throw { status: 400, message: '该标签已被使用，不能删除' };
    }

    const result = await tagsService.delTag(id);

    const responseData = {
      code: 204,
      msg: '删除成功',
      data: result,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 批量删除标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function batchDelTags(ctx) {
  try {
    const { ids } = ctx.request.query;

    const idsArr = ids.split(',');

    if (!idsArr || idsArr.length === 0) {
      throw { status: 400, message: 'ids不能为空，并且必须是一个非空数组' };
    }

    const { data } = await dataService.getData();

    // 检查是否有标签已被使用
    const usedTags = [];
    for (const id of idsArr) {
      const isThisIdWasUsed = data.some(item => item.tags.includes(id));
      if (isThisIdWasUsed) {
        usedTags.push(id);
      }
    }

    if (usedTags.length > 0) {
      throw {
        status: 400,
        message: `标签 ${usedTags.join(', ')} 已被使用，不能删除`,
      };
    }

    // 执行批量删除操作
    const results = await Promise.all(idsArr.map(id => tagsService.delTag(id)));

    const responseData = {
      code: 204,
      msg: '批量删除成功',
      data: results,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTag,
  getTags,
  editTag,
  delTag,
  batchDelTags,
};
