<template>
    <div id="group">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/operation/game/game_list' }">比赛1</el-breadcrumb-item>
            <el-breadcrumb-item>小组</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="handle-con clearfix">
                <el-button type="primary" icon="el-icon-plus" class="add-button" @click="addClick">增加小组</el-button>
                <el-input v-model="searchText" placeholder="请输入小组名称" class="search-input" suffix-icon="el-icon-search"></el-input>
            </div>
            <div class="table-con" v-loading="loading">
                <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column
                    label="名称">
                    <template slot-scope="scope">
                        <router-link class="cell-underline"
                                :to="{path: `/operation/game/${gameId}/${scope.row.id}/grade`}">{{ scope.row.name }}</router-link>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="人数">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="150"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="editClick(scope.row)" type="text" size="small">修改</el-button>
                        <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" class="add-dialog" width="30%">
            <div>
                <label>小组名称：</label>
                <el-input v-model="addGroup" placeholder="请输入小组名称" ></el-input>
            </div>
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSureClick">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            width="20%"
            class="delete-dialog">
            <span class="delete-title">确认删除该小组？</span>
            <span slot="footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'categary',
    data () {
        return {
            gameId: this.$route.params['g_id'],
            searchText: '',
            tableData: [],
            currentGroup: null,
            addDialogVisible: false,
            deleteDialogVisible: false,
            addGroup: '',
            dialogTitle: '',
            loading: true
        }
    },
    mounted () {
        this.tableData = [
            {
                id: 1,
                name: '小组1',
                num: '1'
            },
            {
                id: 2,
                name: '小组2',
                num: '2'
            },
            {
                id: 3,
                name: '小组3',
                num: '3'
            }
        ]
        this.loading = false
    },
    methods: {
        addClick () {
            this.dialogTitle = "新增小组"
            this.addGroup = ''
            this.addDialogVisible = true
            this.currentGroup = null
            this.addGame = ''
        },
        editClick (row) {
            this.currentGroup = row.id
            this.addGroup = row.name
            this.dialogTitle = "修改小组"
            this.addGame = row.name
            this.addDialogVisible = true 
        },
        addSureClick () {
            this.addDialogVisible = false 
        },
        deleteClick (row) {
            this.currentGroup = row.id
            this.deleteDialogVisible = true 
        },
        deleteSure () {
            this.deleteDialogVisible = false 
        }
    }
}
</script>
<style lang="less" scoped>
#group {
    .el-breadcrumb {
        height: 46px;
        background-color: #ffffff;
        line-height: 46px;
        padding-left: 30px;
    }
    .content {
        margin-top: 20px;
        background-color: #ffffff;
        padding: 30px;
        .handle-con {
        .add-button {
            float: left;
        }
        .search-input {
            float: right;
        }
    }
    .table-con {
        padding-top: 20px;
    }
    }
    .delete-dialog {
        .delete-title {
            font-size: 16px;
            padding-left: 46px;
        }
    }
    .el-input {
        width: 224px;
    }
}
</style>
