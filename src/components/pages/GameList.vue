<template>
    <div id="game-list">
        <div class="handle-con clearfix">
            <el-button type="primary" icon="el-icon-plus" class="add-button" @click="addClick">增加比赛</el-button>
            <el-input v-model="searchText" placeholder="请输入比赛名称" class="search-input" suffix-icon="el-icon-search"></el-input>
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
                               :to="{path: `/operation/game/${scope.row.id}/group`}">{{ scope.row.name }}</router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="场地">
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
        <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" class="add-dialog" width="30%">
            <div>
                <label>比赛名称：</label>
                <el-input v-model="addGame" placeholder="请输入比赛名称" ></el-input>
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
            <span class="delete-title">确认删除该项比赛？</span>
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
            searchText: '',
            tableData: [],
            currentGame: null,
            addDialogVisible: false,
            deleteDialogVisible: false,
            addGame: '',
            dialogTitle: '',
            loading: true
        }
    },
    mounted () {
        this.tableData = [
            {
                id: 1,
                name: '比赛1',
                address: '场地1'
            },
            {
                id: 2,
                name: '比赛2',
                address: '场地2'
            },
            {
                id: 3,
                name: '比赛3',
                address: '场地3'
            }
        ]
        this.loading = false
    },
    methods: {
        addClick () {
            this.dialogTitle = "新增比赛"
            this.addDialogVisible = true
            this.currentGame = null
            this.addGame = ''
        },
        editClick (row) {
            this.currentGame = row.id
            this.dialogTitle = "修改比赛"
            this.addGame = row.name
            this.addDialogVisible = true 
        },
        addSureClick () {
            this.addDialogVisible = false 
        },
        deleteClick (row) {
            this.currentGame = row.id
            this.deleteDialogVisible = true 
        },
        deleteSure () {
            this.deleteDialogVisible = false 
        }
    }
}
</script>
<style lang="less" scoped>
#game-list {
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
