using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TresorerieApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameMontantToAmount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Categories_CategorieId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Montant",
                table: "Transactions",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "CategorieId",
                table: "Transactions",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_CategorieId",
                table: "Transactions",
                newName: "IX_Transactions_CategoryId");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "Categories",
                newName: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Categories_CategoryId",
                table: "Transactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Categories_CategoryId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Transactions",
                newName: "CategorieId");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Transactions",
                newName: "Montant");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions",
                newName: "IX_Transactions_CategorieId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "Nom");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Categories_CategorieId",
                table: "Transactions",
                column: "CategorieId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
